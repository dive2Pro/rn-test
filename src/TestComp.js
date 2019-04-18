import React from 'react'
import {View, ActionSheetIOS, TouchableOpacity, Text} from 'react-native'
import NativeUtils from './native'

export default class TextComp extends React.PureComponent {
    state = {
        mediaFiles: []
    }
    openCamera = async () => {
        try {

            const resp = await NativeUtils.requestCameraAuthcation()
            if (resp === 'cancel') {
                NativeUtils.toast.show('Failed')
            } else {
                const response = await NativeUtils.requestFakeData()
                this.setState({
                    mediaFiles: response
                })
            }

        } catch (e) {
            console.error(e)
        }
    }
    handleUpload = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: ['A', 'B', 'Cancel'],
            cancelButtonIndex: 2
        }, (index) => {
            if (index === 0) {
                this.openCamera()
            }
        })
    }

    renderUpload() {
        return <TouchableOpacity onPress={this.handleUpload}>
            <View testID={'upload'}>
                Upload
            </View>
        </TouchableOpacity>
    }

    render() {
        return <View>
            {
                this.state.mediaFiles.map(file => {
                    return <View key={file.name} testID={file.name}> {file.name}</View>
                })
            }
            {
                this.renderUpload()
            }
        </View>
    }
}
