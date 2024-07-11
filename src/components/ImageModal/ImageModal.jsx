export default function ImageModal({ image, onRequestClose }) {
  if (!image) {
    return null;
  }
  const { urls, alt_description } = image;

  return (
    <div>
      <button onClick={onRequestClose}>Close</button>
      <img src={urls.regular} alt={alt_description} />
    </div>
  );
}
