import css from "./SearchBox.module.css";

export default function SearchBox({ value, onFilter }) {
  return (
    <div>
      <p className={css.searchText}>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={(evt) => {
          //   console.log(evt.target.value);
          onFilter(evt.target.value);
        }}
      />
    </div>
  );
}
