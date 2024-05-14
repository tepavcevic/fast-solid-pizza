import { redirect } from '@solidjs/router';
import { useFormHandler, Field } from 'solid-form-handler';
import { zodSchema } from 'solid-form-handler/zod';
import { z } from 'zod';

import Button from '../../components/button';
import Loader from '../../components/loader';
import NavigationDialog from '../../components/navigation-dialog';
import EmptyCart from '../../features/cart/empty-cart';
import { fetchAddress } from '../../features/user/userSlice';
import { createOrder } from '../../services/apiRestaurant';
import {
  clearCart,
  cart as storeCart,
  getTotalCartPrice,
} from '../../store/cart';
import { user } from '../../store/users';
import { formatCurrency } from '../../utils/helpers';
import { Show, createEffect } from 'solid-js';
import { useStore } from '@nanostores/solid';

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
  cart: z.string(),
  priority: z.boolean().optional(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();

  const submission = await parseWithZod(formData, {
    schema: OrderSchema,
    async: true,
  });

  if (submission.status !== 'success') return submission.reply();
  if (!submission.value) return null;

  const order = {
    ...submission.value,
    cart: JSON.parse(submission.value.cart),
    position: submission.value.position ?? '',
    priority: submission.payload?.priority ? true : false,
  };

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export const meta: MetaFunction = () => {
  return [{ title: 'Order | Fast React Pizza Co.' }];
};

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useStore(user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const lastSubmit = useActionData<typeof clientAction>();

  const formHandler = useFormHandler(zodSchema(OrderSchema), {
    validateOn: ['blur'],
  });
  const { formData } = formHandler;

  createEffect(() => {
    if (username) {
      formHandler.fillForm({ customer: username });
    }
  });

  const cart = useStore(storeCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const priorityPrice = form.value?.priority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (navigation.state === 'loading') return <Loader />;

  if (!cart.length && navigation.state === 'idle') return <EmptyCart />;

  return (
    <div class="px-4 py-6">
      <h2 class="mb-8 text-xl font-semibold">Ready to order? Let&apos;s go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <form>
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
                    disabled={isSubmitting}
                    required
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
          <label for={fields.phone.id} class="sm:basis-40">
            Phone number
          </label>
          <div class="grow">
            <input
              {...getInputProps(fields.phone, { type: 'tel' })}
              class="input w-full"
              disabled={isSubmitting}
              required
            />
            {fields.phone.errors && (
              <p class="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 transition-opacity transform opacity-100 scale-y-100">
                {fields.phone.errors}
              </p>
            )}
          </div>
        </div>

        <div class="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label for={fields.address.id} class="sm:basis-40">
            Address
          </label>
          <div class="grow">
            <input
              {...getInputProps(fields.address, { type: 'text' })}
              class="input w-full"
              defaultValue={address}
              disabled={isLoadingAddress || isSubmitting}
              required
            />
            {addressStatus === 'error' && (
              <p class="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 transition-opacity transform opacity-100 scale-y-100">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span class="absolute right-[3px] top-[35px] z-50 sm:top-[3px] md:top-[5px]">
              <Button
                type="small"
                onClick={() => {
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress || isSubmitting}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div class="mb-12 flex items-center gap-5">
          <input
            class="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            {...getInputProps(fields.priority, { type: 'checkbox' })}
            disabled={isSubmitting}
          />
          <label for={fields.priority.id} class="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            {...getInputProps(fields.cart, {
              type: 'hidden',
            })}
            value={JSON.stringify(cart)}
          />
          <input
            {...getInputProps(fields.position, {
              type: 'hidden',
            })}
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />

          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Placing order....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>

        {blocker.state === 'blocked' ? (
          <NavigationDialog blocker={blocker} />
        ) : null}
      </form>
    </div>
  );
}

export default CreateOrder;
