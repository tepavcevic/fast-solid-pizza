import { Field, useFormHandler } from 'solid-form-handler';
import { zodSchema } from 'solid-form-handler/zod';
import { z } from 'zod';
import { useStore } from '@nanostores/solid';
import { useIsRouting, useNavigate } from '@solidjs/router';
import { Show, createEffect, createSignal, onMount } from 'solid-js';
import { Title } from '@solidjs/meta';

import Loader from '../../components/loader';
import Button from '../../components/button';
import {
  clearCart,
  getTotalCartPrice,
  cart as storeCart,
} from '../../store/cart';
import { user as storeUser } from '../../store/users';
import { formatCurrency } from '../../utils/helpers';
import { CartItem, Order } from '../../types/order';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const OrderSchema = z.object({
  customer: z
    .string({ required_error: 'Please give us your name.' })
    .min(3, { message: 'Minimum length of 3' })
    .max(50, { message: 'Maximum length of 50' }),
  phone: z
    .string({
      required_error: 'Please give us your phone number.',
    })
    .refine(isValidPhone, {
      message:
        'Please give us your correct phone number. We might need it to contact you.',
    }),
  address: z
    .string({ required_error: 'Please give us your address.' })
    .min(3, { message: 'Minimum length of 3' })
    .max(50, { message: 'Maximum length of 70' }),
  position: z.string().optional(),
  // cart: z.string(),
  priority: z.boolean().optional(),
});

// const createOrder = action(async (data: FormData) => {
//   const submission = await OrderSchema.safeParseAsync(data, { async: true });

//   if (!submission.success) throw new Error('Invalid form, whatever');

//   const order = {
//     ...submission.data,
//     cart: JSON.parse(submission.data.cart) as Array<CartItem>,
//     position: submission.data.position ?? '',
//     priority: Boolean(submission.data?.priority),
//   };

//   const newOrder = await createOrder(order);

//   clearCart();

//   throw redirect(`/order/${newOrder.id}`);
// });

function NewOrder() {
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const isRouting = useIsRouting();
  const navigate = useNavigate();

  const user = useStore(storeUser);
  const isLoadingAddress = user().addressStatus === 'loading';

  const formHandler = useFormHandler(zodSchema(OrderSchema), {
    validateOn: ['blur', 'input'],
  });
  const { formData } = formHandler;

  onMount(() => {
    // eslint-disable-next-line no-void
    void formHandler.setFieldDefaultValue('customer', user().username);
    // eslint-disable-next-line no-void
    void formHandler.setFieldDefaultValue('priority', false);
  });

  const cart = useStore(storeCart);
  const totalCartPrice = useStore(getTotalCartPrice);

  const [totalPrice, setTotalPrice] = createSignal(totalCartPrice());
  createEffect(() => {
    const priorityPrice = formHandler.getFieldValue('priority')
      ? totalCartPrice() * 0.2
      : 0;
    setTotalPrice(totalCartPrice() + priorityPrice);
  });

  function onSubmit(event: Event) {
    setIsSubmitting(true);
    event.preventDefault();

    try {
      // eslint-disable-next-line no-void
      void formHandler.validateForm().then(() => {
        const order = {
          ...JSON.parse(JSON.stringify(formData())),
          cart: JSON.parse(JSON.stringify(cart())) as Array<CartItem>,
          position:
            user().position.latitude && user().position.longitude
              ? `${user().position.latitude},${user().position.longitude}`
              : '',
          priority: Boolean(formHandler.getFieldValue('priority')),
        } as Order;

        // eslint-disable-next-line no-void
        void formHandler.resetForm().then(() => {
          // eslint-disable-next-line no-void
          void createOrder(order).then((newOrder) => {
            navigate(`/order/${newOrder.id}`);
            setIsSubmitting(false);
            clearCart();
          });
        });
      });
    } catch (error) {
      setIsSubmitting(false);
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  // if (!cart.length && navigation.state === 'idle') return <EmptyCart />;

  return (
    <>
      <Title>Order | Fast Solid Pizza Co.</Title>
      <div class="px-4 py-6">
        <h2 class="mb-8 text-xl font-semibold">
          Ready to order? Let&apos;s go!
        </h2>

        {/* <Form method="POST" action="/order/new"> */}
        <form onSubmit={onSubmit}>
          <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Field
              mode="input"
              name="customer"
              formHandler={formHandler}
              render={(field) => (
                <>
                  <label for={field.props.id} class="sm:basis-40">
                    First Name
                  </label>
                  <div class="flex flex-col grow">
                    <input
                      {...field.props}
                      class="input grow"
                      disabled={isSubmitting()}
                    />
                    <Show when={field.helpers.error}>
                      <p class="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 transition-opacity transform opacity-100 scale-y-100">
                        {field.helpers.errorMessage}
                      </p>
                    </Show>
                  </div>
                </>
              )}
            />
          </div>

          <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Field
              mode="input"
              name="phone"
              formHandler={formHandler}
              render={(field) => (
                <>
                  <label for={field.props.id} class="sm:basis-40">
                    Phone number
                  </label>
                  <div class="grow">
                    <input
                      {...field.props}
                      type="tel"
                      class="input w-full"
                      disabled={isSubmitting()}
                    />
                    <Show when={field.helpers.error}>
                      <p class="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 transition-opacity transform opacity-100 scale-y-100">
                        {field.helpers.errorMessage}
                      </p>
                    </Show>
                  </div>
                </>
              )}
            />
          </div>

          <div class="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Field
              mode="input"
              name="address"
              formHandler={formHandler}
              render={(field) => (
                <>
                  <label for={field.props.id} class="sm:basis-40">
                    Address
                  </label>
                  <div class="grow">
                    <input
                      {...field.props}
                      class="input w-full"
                      disabled={isLoadingAddress || isSubmitting()}
                    />
                    <Show when={field.helpers.error}>
                      <p class="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 transition-opacity transform opacity-100 scale-y-100">
                        {field.helpers.errorMessage}
                      </p>
                    </Show>
                  </div>
                  <Show
                    when={
                      !user().position?.latitude && !user().position?.longitude
                    }
                  >
                    <span class="absolute right-[3px] top-[35px] z-50 sm:top-[3px] md:top-[5px]">
                      <Button
                        variant="small"
                        onClick={() => {
                          // dispatch(fetchAddress());
                        }}
                        disabled={isLoadingAddress || isSubmitting()}
                      >
                        Get position
                      </Button>
                    </span>
                  </Show>
                </>
              )}
            />
          </div>

          <div class="mb-12 flex items-center gap-5">
            <Field
              mode="checkbox"
              name="priority"
              formHandler={formHandler}
              render={(field) => (
                <>
                  <input
                    class="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                    {...field.props}
                    disabled={isSubmitting()}
                    type="checkbox"
                  />
                  <label for={field.props.id} class="font-medium">
                    Want to yo give your order priority?
                  </label>
                </>
              )}
            />
          </div>

          <div>
            {/* <Field
              mode="input"
              name="cart"
              value={JSON.stringify(cart())}
              formHandler={formHandler}
              render={(field) => <input {...field.props} type="hidden" />}
            />

            <Field
              mode="input"
              name="position"
              value={
                user().position.latitude && user().position.longitude
                  ? `${user().position.latitude},${user().position.longitude}`
                  : ''
              }
              formHandler={formHandler}
              render={(field) => <input {...field.props} type="hidden" />}
            /> */}

            <Button
              disabled={
                isSubmitting() ||
                isLoadingAddress ||
                formHandler.isFormInvalid()
              }
              variant="primary"
              type="submit"
            >
              {isSubmitting()
                ? 'Placing order....'
                : `Order now from ${formatCurrency(totalPrice())}`}
            </Button>
          </div>

          {/* {blocker.state === 'blocked' ? (
          <NavigationDialog blocker={blocker} />
        ) : null} */}
        </form>
      </div>
    </>
  );
}

export default NewOrder;
