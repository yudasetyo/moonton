import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, useForm } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import { Inertia } from "@inertiajs/inertia";

export default function Create({ auth, movie }) {
    const { data, setData, processing, errors } = useForm({
        ...movie,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }

        Inertia.post(route("admin.dashboard.movie.update", movie.id), {
            _method: "PUT",
            ...data,
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Update Movie" />
            <h1 className="text-xl">Update Movie: {movie.name}</h1>
            <hr className="mb-4" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="Name" />
                    <TextInput
                        type="text"
                        name="name"
                        defaultValue={movie.name}
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Enter The Name Of Movie"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel
                        forInput="category"
                        value="Category"
                        className="mt-4"
                    />
                    <TextInput
                        type="text"
                        name="category"
                        defaultValue={movie.category}
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Enter The Category Of Movie"
                    />
                    <InputError message={errors.category} className="mt-2" />
                </div>
                <div>
                    <InputLabel
                        forInput="video_url"
                        value="Video URL"
                        className="mt-4"
                    />
                    <TextInput
                        type="text"
                        name="video_url"
                        defaultValue={movie.video_url}
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Enter The Video URL Of Movie"
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>
                <div>
                    <InputLabel
                        forInput="thumbnail"
                        value="Thumbnail"
                        className="mt-4"
                    />
                    <img
                        src={`/storage/${movie.thumbnail}`}
                        alt=""
                        className="w-40"
                    />
                    <TextInput
                        type="file"
                        name="thumbnail"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Insert Thumbnail Of Movie"
                    />
                    <InputError message={errors.thumbnail} className="mt-2" />
                </div>
                <div>
                    <InputLabel
                        forInput="rating"
                        value="Rating"
                        className="mt-4"
                    />
                    <TextInput
                        type="number"
                        name="rating"
                        defaultValue={movie.rating}
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Enter Rating Of Movie"
                    />
                    <InputError message={errors.rating} className="mt-2" />
                </div>
                <div>
                    <div className="flex flex-row mt-4 items-center">
                        <InputLabel
                            forInput="is_featured"
                            value="Is Featured"
                            className="mr-3 mt-1"
                        ></InputLabel>
                        <Checkbox
                            name="is_featured"
                            handleChange={(e) =>
                                setData("is_featured", e.target.checked)
                            }
                            checked={movie.is_featured}
                        />
                    </div>
                </div>
                <PrimaryButton
                    type="submit"
                    className="mt-4"
                    processing={processing}
                >
                    Save
                </PrimaryButton>
            </form>
        </Authenticated>
    );
}
