import MyButton from '@/components/UI/MyButton.vue'
import MyInput from '@/components/UI/MyInput.vue'
import MyDialog from '@/components/UI/MyDialog.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MyButton: typeof MyButton
    MyInput: typeof MyInput
    MyDialog: typeof MyDialog
  }
}
