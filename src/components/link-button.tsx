import { A, useNavigate } from '@solidjs/router';
import { ParentComponent } from 'solid-js';

const LinkButton: ParentComponent<{to: string}> = (props) => {
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (props.to === '-1')
    return (
      <button onClick={() => navigate(-1)} class={className}>
        {props.children}
      </button>
    );

  return (
    <A href={props.to} class={className}>
      {props.children}
    </A>
  );
}

export default LinkButton