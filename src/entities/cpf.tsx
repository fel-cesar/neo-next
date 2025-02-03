// COMMENT: this is an example of entity
// COMMENT: The validation here is not entirely necessary,
// COMMENT: I enforced the validation here for sake of CLEAN arch demonstration as the entities should be self validating.
// COMMENT: We could also have a separate service that validates the data.

export class Cpf {
  private readonly value: string;

  constructor(cpf: string) {
    // COMMENT: here we can also make types validation on runtime
    // COMMENT: we can either throw an error create the object with "invalid" flag (depending on the error handling)
    if (!this.isValidCpf(cpf)) {
      throw new Error("Invalid CPF format"); // TODO: create a custom error
    }
    this.value = cpf;
  }

  getValue(): string {
    return this.value;
  }



  // COMMENT: We could also separate the validators themselves for string size, string format, etc. (dont think its necessary here)
  private isValidCpf(cpf: string): boolean {
    // Remove non-numeric characters
    const cleanedCpf = cpf.replace(/\D/g, "");

    // CPF must be 11 digits
    if (cleanedCpf.length !== 11) return false;

    // Check for repeated sequences (e.g., 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;

    // Validate CPF checksum
    return this.validateCpfChecksum(cleanedCpf);
  }

  private validateCpfChecksum(cpf: string): boolean {
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
