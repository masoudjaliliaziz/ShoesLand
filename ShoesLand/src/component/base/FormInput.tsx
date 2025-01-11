import clsx from "clsx";

const FormInput = ({
  id,
  type = "text",
  placeholder,
  register,
  validationRules,
  errors,
  icon,
  extra = null,
}) => {
  return (
    <div>
      <div
        className={clsx(
          "flex gap-2 items-center bg-gray-100 py-1 px-2 rounded flex-col",
          !errors?.[id]?.message ? "mb-5" : "mb-0"
        )}
      >
        <div className="flex items-center space-x-1 w-full">
          {icon}
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className="bg-transparent w-[90%] outline-none focus:bg-transparent"
            style={{
              WebkitBoxShadow: "0 0 0px 1000px transparent inset",
              WebkitTextFillColor: "inherit",
              transition: "background-color 5000s ease-in-out 0s",
            }}
            {...register(id, validationRules)}
          />
          {extra}
        </div>
      </div>
      <p className="text-rose-500 font-normal text-xs px-3 w-full truncate">
        {errors?.[id]?.message}
      </p>
    </div>
  );
};

export default FormInput;
