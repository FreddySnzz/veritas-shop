import { FaChevronDown } from "react-icons/fa"; 

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  section?: string;
};

export default function ButtonScrollDown({ className, section }: ButtonProps) {
  return (
    <div>
      <a href={`#${section}`}>
        <button 
          className={`shadow-none animate-bounce cursor-pointer ${className}`}
        >
          <FaChevronDown  />
        </button>
      </a>
    </div>
  );
};