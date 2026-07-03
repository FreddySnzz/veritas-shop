// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function validate(schema: any, form: any) {
  const result = schema.safeParse(form);

  if (!result.success) {
    const fieldErrors: { [key: string]: string } = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result.error.issues.forEach((issue: any) => {
      const path = issue.path[0];
      if (typeof path === "string") fieldErrors[path] = issue.message;
    });

    return {
      success: false,
      errors: fieldErrors,
    }
  };

  return {
    success: true,
    errors: {},
  };
};