import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>hello cpf</p>
      <Link href="/dashboard">DASHBOARD</Link>
      <input type="text" placeholder="type here the CPF to filter results" />
    </div>
  );
}
