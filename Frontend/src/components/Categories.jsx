export default function Categories({name,image}) {


  return (

          <div
        
            className="border rounded-lg overflow-hidden hover:shadow-lg cursor-pointer"
          >
            <img
              src={image}
              alt={name}
              className="h-auto w-full  object-cover"
            />
            <div className="text-center py-2 font-semibold">{name}</div>
          </div>

  );
}
