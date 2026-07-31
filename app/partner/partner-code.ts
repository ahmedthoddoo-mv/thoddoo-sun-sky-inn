const validPartnerCode = String.fromCharCode(66, 69, 90, 67, 69, 83, 84, 79, 86, 75, 89);

export const partnerCodeError = "This partner code is not valid. Please check the code or contact Sun Sky Inn.";

export function getPartnerDestination(value: string) {
  return value.trim().toUpperCase() === validPartnerCode ? "/bez-cestovky" : null;
}
