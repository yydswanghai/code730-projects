import styles from 'styles/variables.module.scss';
import { computed } from 'vue';
/**
 * @description 使用 variables.module.scss
 */
export default function useVariablesModule() {
    const variablesRef = computed(() => styles)
    return {
        variables: variablesRef
    }
}