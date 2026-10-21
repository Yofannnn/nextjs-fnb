interface ProductDescriptionProps {
  description: string | null;
  ingredients: string | null;
}

export function ProductDescription({ description, ingredients }: ProductDescriptionProps) {
  return (
    <>
      {description && (
        <h6>
          <span className="font-semibold">Description:</span> <br /> <span>{description}</span>
        </h6>
      )}
      {ingredients && (
        <h6>
          <span className="font-semibold">Ingredients:</span> <br /> <span>{ingredients}</span>
        </h6>
      )}
    </>
  );
}
