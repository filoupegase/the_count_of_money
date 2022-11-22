import React, { PropsWithChildren } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { styled, IconButton, DialogTitle, Dialog } from "@mui/material";


export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
    isTitle: string | undefined;
}

function CustomDialogTitle(props: DialogTitleProps) {
    const { children, onClose, isTitle, ...other } = props;

    function isT() {
        if (isTitle) {
            return 2;
        }
    }

    return (
        <DialogTitle
            sx={ {
                m: 0,
                mb: isT(),
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 600
            } }
            { ...other }>
            { children }
            { onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={ onClose }
                    sx={ {
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    } }
                >
                    <CloseIcon />
                </IconButton>
            ) : null }
        </DialogTitle>
    );
}

type DialogLayoutProps = PropsWithChildren<{
    title?: string,
    onClose: () => void;
    open: boolean;
}>;

const DialogLayout = ({ title, onClose, open, children }: DialogLayoutProps) => {
    return (
        <>
            <CustomDialog
                open={ open }
                onClose={ onClose }
                aria-labelledby="alert-dialog-title"
            >
                <CustomDialogTitle isTitle={ title } id="customized-dialog-title" onClose={ onClose }>
                    { title }
                </CustomDialogTitle>
                { children }
            </CustomDialog>
        </>
    );
};

const CustomDialog = styled(Dialog)(() => ({
    '& .MuiPaper-root': { height: 'auto', minWidth: 470 },
    '& .MuiDialogContent-root': { padding: '25px 45px 6px 45px' },
    '& .MuiDialogActions-root': { padding: '20px 45px 25px 45px' },
}));

export default DialogLayout;