import { A } from "@solidjs/router";
import { ParentComponent } from "solid-js";

const base =
  'text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

const styles = {
  primary: base + ' px-4 py-3 md:px- md:py-4',
  small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
  secondary:
    'md:px- md:py-3.5 text-sm rounded-full border-2 border-stone-300 px-3 py-2.5 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed',
  round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
};

const Button: ParentComponent<{
  disabled?: boolean;
  to?: string;
  type?: keyof typeof styles;
  onClick?: () => void;
}> = (props) => {
  if (props.to)
    return (
      <A href={props.to} class={props.type && styles[props.type]}>
        {props.children}
      </A>
    );

  if (props.onClick)
    return (
      <button
        disabled={props.disabled}
        class={props.type ? styles[props.type] : base}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );

  return (
    <button disabled={props.disabled} class={props.type && styles[props.type]}>
      {props.children}
    </button>
  );
}

export default Button