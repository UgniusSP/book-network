import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { Loader } from "../components/loader/Loader";
import { PublicationDto } from "../dto/PublicationDto";
import { PublicationDetails } from "../components/publication/PublicationDetails";
import { PublicationPageRightPanel } from "../components/publication/PublicationPageRightPanel";
import usePostData from "../hooks/usePostData";
import {Alert} from "@mui/material";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { useProtectedAxios } from "../hooks/useProtectedAxios";

export const PublicationPage: React.FC = () => {
    const { id = "" } = useParams<{ id: string }>();
    const { loading: postLoading, success, postData } = usePostData(`/publications/${id}/borrow`);
    const { data: fetchedPublication, loading, error } = useFetchData(
        `publications/${id}`
    );
    const { data: fetchedUser, loading: userLoading } = useFetchData(
        `publications/${id}/owner`
    );
    const [publication, setPublication] = useState<PublicationDto | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const axios = useProtectedAxios();
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchedPublication) {
            setPublication(fetchedPublication);
        }
        if(fetchedUser) {
            setUsername(fetchedUser);
        }
    }, [fetchedPublication, fetchedUser]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading || userLoading || postLoading) {
        return <Loader />;
    }

    const navigateToUser = () => {
        navigate(`/users/${publication?.id}`);
    };

    const handleClickOnBorrow = () => {
        setOpen(true);
    };

    const handleConfirmBorrow = () => {
        try {
            postData({});
        } catch (e) {
            console.error(e);
        } finally {
            setOpen(false);
        }
    };

    // const handleReturnBorrow = async () => {
    //     try {
    //         await axios.delete(`/publications/${id}/return`);
    //         setBorrowed(false);
    //         setReturnSuccess(true);
    //     } catch (e) {
    //         console.error(e);
    //         setReturnSuccess(false);
    //     } finally {
    //         setOpen(false);
    //     }
    // };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="flex pl-5 mt-5 ml-5 mr-10 justify-between gap-14">
            <div className="flex">
                {publication?.image && (
                    <div className="w-56 h-auto flex-shrink-0 mr-2">
                        <img
                            src={`data:image/jpeg;base64,${publication.image}`}
                            alt={publication.title}
                            className="w-full h-80 rounded-md"
                        />
                    </div>
                )}
                <div>
                    {publication && (
                        <PublicationDetails
                            id={publication.id}
                            title={publication.title}
                            author={publication.author}
                            available={publication.available}
                            summary={publication.summary}
                            publicationDate={publication.publicationDate}
                            language={publication.language}
                            publicationType={publication.publicationType}
                            isbn={publication.isbn}
                            genre={publication.genre}
                            pageCount={publication.pageCount}
                            format={publication.format}
                            frequency={publication.frequency}
                        />
                    )}
                </div>
            </div>
            <PublicationPageRightPanel
                username={username || ""}
                status={"Borrow"}
                handleClickOnUser={navigateToUser}
                handleClickOnBorrow={handleClickOnBorrow}
            />
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">Publication borrowed successfully!</Alert>}
            <ConfirmationDialog
                open={open}
                title="Confirm Borrow"
                content="Are you sure you want to borrow this book?"
                onConfirm={handleConfirmBorrow}
                onCancel={handleClose}
            />
        </div>
    );
};
