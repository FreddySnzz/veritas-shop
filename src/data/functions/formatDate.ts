export const formatDate = (dateInput: Date | string) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

export const formatDateShowingOnlyMonth = (dateInput: Date | string) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

export const formatDateShowingOnlyYear = (dateInput: Date | string) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

export const formatDateWithTime = (dateInput: Date | string) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
};