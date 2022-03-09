export const required = (value) => (value && value !== "select" ? undefined : "required");

export const email = (value) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
	? "Invalid email address" : undefined);

export const password = (value) => (value && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)
	? "Min 8 chars, 1 letter, 1 number and 1 special char" : undefined);
