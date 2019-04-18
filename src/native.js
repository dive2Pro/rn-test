export default class NativeUtils {

    static requestCameraAuthcation = () => {
        return Promise.reject("Wrong code")
    }
    static toast = {
        show() {},
        hide() {}
    }
}
