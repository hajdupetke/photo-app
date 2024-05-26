interface CardProps {
  image: {
    id: number;
    url: string;
    name: string | null;
    title: string | null;
  };
}
export const Card = ({ image }: CardProps) => {
  return (
    <div className="card card-compact w-96 bg-base-300 shadow-xl h-4/5">
      <div className="p-4 w-full h-3/4">
        <img
          src={image.url}
          alt="Shoes"
          className=" w-full h-full object-cover"
        />
      </div>
      <div className="card-body">
        <div>
          <h2 className="card-title text-golden mb-0 text-2xl">
            {image.title}
          </h2>
          <p className="text-lg">{image.name}</p>
        </div>
        <div className="flex gap-2">
          <div className="badge badge-primary">Tag 1</div>
          <div className="badge badge-secondary">Tag 2</div>
        </div>
      </div>
    </div>
  );
};
