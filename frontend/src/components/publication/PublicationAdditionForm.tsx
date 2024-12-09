import React, { useState } from "react";
import { PublicationDto } from "../../dto/PublicationDto";
import {
    Box,
    Button,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Alert,
} from "@mui/material";
import {useProtectedAxios} from "../../hooks/useProtectedAxios";
import usePostData from "../../hooks/usePostData";

export const PublicationAdditionForm: React.FC = () => {
    const axios = useProtectedAxios();
    const { loading, error, success, response, postData } = usePostData("/publications/add");
    const [formData, setFormData] = useState<PublicationDto>({
        title: "",
        author: "",
        publicationDate: "",
        language: "",
        publicationType: "BOOK",
        image: null,
        isbn: "",
        genre: "",
        pageCount: undefined,
        format: "",
        summary: "",
        frequency: "",
    });

    const handleChange = (field: string, value: string | boolean | number | undefined) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
        }
    };

    const handleAddPublication = async (e: React.FormEvent) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();

        formDataToSubmit.append("title", formData.title);
        formDataToSubmit.append("author", formData.author);
        formDataToSubmit.append("publicationDate", formData.publicationDate);
        formDataToSubmit.append("language", formData.language);
        formDataToSubmit.append("publicationType", formData.publicationType);

        if (formData.isbn) {
            formDataToSubmit.append("isbn", formData.isbn);
        }
        if (formData.genre) {
            formDataToSubmit.append("genre", formData.genre);
        }
        if (formData.pageCount !== undefined) {
            formDataToSubmit.append("pageCount", String(formData.pageCount));
        }
        if (formData.format) {
            formDataToSubmit.append("format", formData.format);
        }
        if (formData.summary) {
            formDataToSubmit.append("summary", formData.summary);
        }
        if (formData.frequency) {
            formDataToSubmit.append("frequency", formData.frequency);
        }
        if (formData.image instanceof File) {
            formDataToSubmit.append("image", formData.image);
        }

        await postData(formDataToSubmit);
        clearForm();
    };

    const clearForm = () => {
        setFormData({
            title: "",
            author: "",
            publicationDate: "",
            language: "",
            publicationType: "BOOK",
            image: null,
            isbn: "",
            genre: "",
            pageCount: undefined,
            format: "",
            summary: "",
            frequency: "",
        });
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-1">Add Publication</h1>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">Publication added successfully!</Alert>}
            <form onSubmit={handleAddPublication}>
                <FormControl>
                    <FormLabel>Publication Type</FormLabel>
                    <RadioGroup
                        value={formData.publicationType}
                        onChange={(e) => handleChange("publicationType", e.target.value)}
                        row
                    >
                        <FormControlLabel value="BOOK" control={<Radio/>} label="Book"/>
                        <FormControlLabel value="PERIODICAL" control={<Radio/>} label="Periodical"/>
                    </RadioGroup>
                </FormControl>

                {/* Common Fields */}
                <div className="flex flex-col items-center gap-4 w-full">
                    <TextField
                        label="Title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        margin="dense"
                        sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                    />
                    <TextField
                        label="Author"
                        value={formData.author}
                        onChange={(e) => handleChange("author", e.target.value)}
                        margin="dense"
                        sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                    />
                    <TextField
                        label="Publication Date"
                        type="date"
                        value={formData.publicationDate}
                        onChange={(e) => handleChange("publicationDate", e.target.value)}
                        InputLabelProps={{shrink: true}}
                        margin="dense"
                        sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                    />
                    <TextField
                        label="Language"
                        value={formData.language}
                        onChange={(e) => handleChange("language", e.target.value)}
                        margin="dense"
                        sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                    />
                    <TextField
                        label="Summary"
                        multiline
                        rows={4}
                        value={formData.summary}
                        onChange={(e) => handleChange("summary", e.target.value)}
                        margin="dense"
                        sx={{width: '100%', fontSize: 16, padding: 1}}
                    />
                </div>

                {/* Conditional Fields */}
                {formData.publicationType === "BOOK" && (
                    <Box className="flex flex-col items-center gap-4 mt-4">
                        <TextField
                            label="ISBN"
                            value={formData.isbn}
                            onChange={(e) => handleChange("isbn", e.target.value)}
                            margin="dense"
                            sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                        />
                        <TextField
                            label="Genre"
                            value={formData.genre}
                            onChange={(e) => handleChange("genre", e.target.value)}
                            margin="dense"
                            sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                        />
                        <TextField
                            label="Page Count"
                            type="number"
                            value={formData.pageCount || ""}
                            onChange={(e) => handleChange("pageCount", Number(e.target.value))}
                            margin="dense"
                            sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                        />
                        <TextField
                            label="Format"
                            value={formData.format}
                            onChange={(e) => handleChange("format", e.target.value)}
                            margin="dense"
                            sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                        />
                    </Box>
                )}

                {formData.publicationType === "PERIODICAL" && (
                    <TextField
                        label="Frequency"
                        value={formData.frequency}
                        onChange={(e) => handleChange("frequency", e.target.value)}
                        margin="dense"
                        sx={{width: '100%', height: 50, fontSize: 16, padding: 1}}
                    />
                )}

                {/* Image Upload */}
                <div className="flex flex-col items-center gap-4 mt-4">
                    <Button variant="contained" component="label" className="mb-2" color="primary">
                        Upload Image
                        <input type="file" hidden onChange={handleImageChange}/>
                    </Button>
                    {formData.image && (
                        <p className="text-sm text-gray-500">Selected file: {(formData.image as File).name}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                    sx={{
                        width: '100%',
                        padding: '12px 0',
                        fontSize: '16px',
                        marginTop: '20px',
                        marginBottom: '10px'
                    }}
                >
                    {loading ? "Submitting..." : "Add Publication"}
                </Button>
            </form>
        </div>
    );

};
