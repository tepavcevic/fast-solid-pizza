import { A, useNavigate } from '@solidjs/router';
import { ParentComponent, Show } from 'solid-js';

const LinkButton: ParentComponent<{ to: string }> = (props) => {
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  return (
    <Show
      when={props.to === '-1'}
      fallback={
        <A href={props.to} class={className}>
          {props.children}
        </A>
      }
    >
      <button onClick={() => navigate(-1)} class={className}>
        {props.children}
      </button>
    </Show>
  );
};

export default LinkButton;
