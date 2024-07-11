import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items }) {
  return (
    <ul>
      {items.map(({ id, urls, alt_description }) => (
        <li key={id}>
          <ImageCard urls={urls} alt={alt_description} />
        </li>
      ))}
    </ul>
  );
}
