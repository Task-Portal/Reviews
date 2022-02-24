

export const SelectedCboxType = "selectedCbox"

export interface SelectedCboxAction {
    type: string;
    payload: Array<string> | null;
}

export const SelectedCboxReducer = (
    state: any = null,
    action: SelectedCboxAction
): Array<string> | null => {
    switch (action.type) {
        case SelectedCboxType:
            return action.payload;
        default:
            return state;
    }
};
