interface AuthInputProps {
  label: string;
  value: any;
  changeValue: (newValue: any) => void;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  notRender?: boolean;
  className?: string;
}

export default function AuthInput(props: AuthInputProps) {
  return props.notRender ? null : (
    <div className="flex flex-col mt-8">
      <label>{props.label}</label>
      <input 
        type={props.type ?? 'text'} 
        value={props.value} 
        onChange={e => props.changeValue?.(e.target.value)} 
        required={props.required}
        className={`rounded-md px-4 py-3 mt-2 border
          bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500`}
      />
    </div>
  );
}