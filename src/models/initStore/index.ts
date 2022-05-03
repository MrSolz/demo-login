import { types } from "mobx-state-tree"

export interface InitSnapshotType {
    api_url: string,
    api_login_url: string
}
export const InitStoreModel = types
    .model("InitStore")
    .props({
        api_url: "",
        api_login_url: ""
    })
    .actions((self) => ({
        saveInit: (initSnapshotType: InitSnapshotType) => {
            self.api_url = initSnapshotType.api_url
            self.api_login_url = initSnapshotType.api_login_url
        },
        getInit: () => {

        }
    }))
