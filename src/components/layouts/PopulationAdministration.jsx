export default function PopulationAdministration({ children, amount, type }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {children}
      <div>
        <p className="text-2xl font-bold text-center">{amount}</p>
        <p className="mt-1 text-lg font-semibold text-center">{type}</p>
      </div>
    </div>
  );
}
