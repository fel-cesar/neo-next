/**
 * Generates a random valid CPF.
 */
export const generateRandomCpf = (): string => {
  const n = () => Math.floor(Math.random() * 9);
  const cpfArray = Array.from({ length: 9 }, n);

  // Calculate first digit
  let d1 = cpfArray.reduce((acc, num, index) => acc + num * (10 - index), 0) % 11;
  d1 = d1 < 2 ? 0 : 11 - d1;
  cpfArray.push(d1);

  // Calculate second digit
  let d2 = cpfArray.reduce((acc, num, index) => acc + num * (11 - index), 0) % 11;
  d2 = d2 < 2 ? 0 : 11 - d2;
  cpfArray.push(d2);

  return cpfArray.join("");
};

/**
 * Generates a random valid CNPJ.
 */
export const generateRandomCnpj = (): string => {
    const n = () => Math.floor(Math.random() * 9);
    const base = Array.from({ length: 8 }, n).concat([0, 0, 0, 1]);

    // Calculate first digit
    const d1Factors = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let d1 = base.reduce((acc, num, index) => acc + num * d1Factors[index], 0) % 11;
    d1 = d1 < 2 ? 0 : 11 - d1;
    base.push(d1);

    // Calculate second digit
    const d2Factors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let d2 = base.reduce((acc, num, index) => acc + num * d2Factors[index], 0) % 11;
    d2 = d2 < 2 ? 0 : 11 - d2;
    base.push(d2);
  
    return base.join("");
  };