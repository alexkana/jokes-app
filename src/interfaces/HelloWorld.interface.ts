/**
 * Interface for HelloWorld component props
 */
export interface HelloWorldProps {
  msg: string;
}

/**
 * Interface for HelloWorld component state
 */
export interface HelloWorldState {
  count: number;
}

/**
 * Interface for HelloWorld component methods
 */
export interface HelloWorldMethods {
  increment: () => void;
} 