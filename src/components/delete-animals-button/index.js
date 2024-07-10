import React, { Component } from 'react';


class DeleteAnimalsButton extends Component {
    render() {
        return (
            <IconButton
                        iconColor={Colors.white}
                        icon="delete"
                        onPress={() =>
                            confirmDeleteAll(selectedIDs, handleDeleteMany)
                        }
                        style={{ margin: 0 }}
                        size={24}
                    />
        );
    }
}

export default DeleteAnimalsButton;