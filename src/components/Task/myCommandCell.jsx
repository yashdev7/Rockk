import * as React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';

export const MyCommandCell = ({ editField, add, update, edit, discard, cancel, remove, dataItem }) => {

    // Check if dataItem is null before destructure
    const id = dataItem ? dataItem.id : null;

    const inEdit = dataItem && dataItem[editField];
    const isNewItem = dataItem && dataItem.task_id === undefined;
    const [visible, setVisible] = React.useState(false);
    // console.log(dataItem.id);
    const onDeleteData = () => {
        remove(dataItem);
        setVisible(false);
    };

    const toggleDialog = () => {
        setVisible(!visible);
    };

    return (
        <td className="k-command-cell">
            <Button themeColor={'primary'} onClick={() => inEdit ? isNewItem ? add(dataItem) : update(dataItem) : edit(dataItem)}>
                {inEdit ? isNewItem ? 'Add' : 'Update' : 'Edit'}
            </Button>
            <Button themeColor={'primary'} onClick={() => inEdit ? isNewItem ? discard(dataItem) : cancel(dataItem) : toggleDialog()}>
                {inEdit ? isNewItem ? 'Discard' : 'Cancel' : 'Remove'}
            </Button>
            {visible && (
                <Dialog title={'Delete Data'} onClose={toggleDialog} width={350}>
                    <div>
                        Are you sure you want to delete item with ID {id}?
                    </div>
                    <DialogActionsBar>
                        <Button onClick={onDeleteData}>Delete</Button>
                        <Button onClick={toggleDialog}>Cancel</Button>
                    </DialogActionsBar>
                </Dialog>
            )}
        </td>
    );
};
