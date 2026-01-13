let counter = 1;

export const generateIdempotencyKey = () => {
  const timestamp = Date.now();
  const padded = String(counter).padStart(3, "0");
  counter++;

  return `REQ-${timestamp}-PROD-${padded}`;
};
