import Link from "next/link";

// import Image from "next/image";
export const CPF_LIST_PLACEHOLDER = [
  "123.456.789-00",
  "123.456.789-01",
  "123.456.789-02",
  "123.456.789-03",
  "123.456.789-04",
  "123.456.789-05",
  "123.456.789-06",
  "123.456.789-07",
  "123.456.789-08",
  "123.456.789-09",
  "123.456.789-10",
];

export default function Home() {
  return (
    <div>
      <p>hello cpf</p>
      <Link href="/dashboard">DASHBOARD</Link>
      <input type="text" placeholder="type here the CPF to filter results" />
      {CPF_LIST_PLACEHOLDER.map((cpf) => {
        return <div key={cpf}>{cpf}</div>;
      })}
    </div>
  );
}
