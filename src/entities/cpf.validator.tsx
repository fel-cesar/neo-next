export class CpfValidator {
  static isValid(cpf: string): boolean {
    const cleanedCpf = cpf.replace(/\D/g, "");
    if (cleanedCpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;
    return this.validateChecksum(cleanedCpf);
  }

  private static validateChecksum(cpf: string): boolean {
    const calculateDigit = (slice: string, factor: number): number => {
      const sum = slice
        .split("")
        .map((num, index) => parseInt(num) * (factor - index))
        .reduce((acc, curr) => acc + curr, 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstDigit = calculateDigit(cpf.slice(0, 9), 10);
    const secondDigit = calculateDigit(cpf.slice(0, 10), 11);

    return (
      firstDigit === parseInt(cpf.charAt(9)) &&
      secondDigit === parseInt(cpf.charAt(10))
    );
  }
}
