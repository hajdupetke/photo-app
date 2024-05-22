interface CardProps {
  image: {
    id: number;
    url: string;
    name: string | null;
  };
}
export const Card = ({ image }: CardProps) => {
  return (
    <>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image.url} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{image.name}</h2>
          <div className="flex gap-2">
            <div className="badge badge-primary">Tag 1</div>
            <div className="badge badge-secondary">Tag 2</div>
            <div className="badge badge-accent">Tag 3</div>
          </div>
        </div>
      </div>
    </>
  );
};
