export class CnpjValidator {
  static isValid(cnpj: string): boolean {
    const cleanedCnpj = cnpj.replace(/\D/g, "");
    if (cleanedCnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cleanedCnpj)) return false;
    return this.validateChecksum(cleanedCnpj);
  }

  private static validateChecksum(cnpj: string): boolean {
    const calculateDigit = (slice: string, multipliers: number[]): number => {
      const sum = slice
        .split("")
        .map((num, index) => parseInt(num) * multipliers[index])
        .reduce((acc, curr) => acc + curr, 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstMultipliers = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondMultipliers = [6, ...firstMultipliers];

    const firstDigit = calculateDigit(cnpj.slice(0, 12), firstMultipliers);
    const secondDigit = calculateDigit(cnpj.slice(0, 13), secondMultipliers);

    return (
      firstDigit === parseInt(cnpj.charAt(12)) &&
      secondDigit === parseInt(cnpj.charAt(13))
    );
  }
}
