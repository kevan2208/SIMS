export function MenuRow({ name, price }: { name: string; price: string }) {
  return (
    <li className="menu-row">
      <span className="text-[0.98rem] leading-snug text-ink">{name}</span>
      <span aria-hidden="true" className="menu-row__leader" />
      <span className="menu-row__price text-[0.98rem] font-semibold text-ink">{price}</span>
    </li>
  );
}
