import { RefreshIcon } from "assests/icons";

export const GenericSection: React.FC<{
  title: String;
  onRefresh?: Function;
}> = (props) => {
  const { children, onRefresh, title } = props;
  return (
    <section className="border-right">
      <div className="row justify-between align-center border-bottom position-sticky top-0 bg-white padding-8 padding-l-16 padding-r-16">
        <h2 className="bold">{title}</h2>
        {!!onRefresh && (
          <button className="btn-link" onClick={() => onRefresh()}>
            <RefreshIcon />
          </button>
        )}
      </div>
      {children}
    </section>
  );
};
