interface AuthInputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  value: any;
  changeValue: (newValue: any) => void;
  type?: React.HTMLInputTypeAttribute;
}

export default function AuthInput(props: AuthInputProps) {
  return (
    <div className="flex flex-col mt-8">
      <label htmlFor="email" className="text-sm font-bold">
        {props.label}
      </label>
      <input 
        type={props.type ?? 'text'} 
        value={props.value} 
        onChange={e => props.changeValue?.(e.target.value)} 
        className={`rounded-xl px-4 py-3 mt-2 border-2
          bg-white focus:outline-none`}
      />
    </div>
  );
}