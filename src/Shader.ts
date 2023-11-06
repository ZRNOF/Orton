export interface VertexShaderProps {
	code: string
	buffers: Iterable<GPUVertexBufferLayout>
	entryPoint?: string
	label?: string | undefined
}

export interface FragmentShaderProps {
	code: string
	targets: Iterable<GPUColorTargetState>
	entryPoint?: string
	label?: string | undefined
}

export interface ComputeShaderProps {
	code: string
	entryPoint?: string
	label?: string | undefined
}

export const VertexShader = (
	device: GPUDevice,
	props: VertexShaderProps
): GPUVertexState => {
	return {
		module: device.createShaderModule({
			label: props.label,
			code: props.code,
		}),
		entryPoint: props.entryPoint || "main",
		buffers: props.buffers,
	}
}

export const FragmentShader = (
	device: GPUDevice,
	props: FragmentShaderProps
): GPUFragmentState => {
	return {
		module: device.createShaderModule({
			label: props.label,
			code: props.code,
		}),
		entryPoint: props.entryPoint || "main",
		targets: props.targets,
	}
}

export const ComputeShader = (
	device: GPUDevice,
	props: ComputeShaderProps | string
): GPUProgrammableStage => {
	if (typeof props === "string") {
		return {
			module: device.createShaderModule({
				code: props,
			}),
			entryPoint: "main",
		}
	}
	return {
		module: device.createShaderModule({
			label: props.label,
			code: props.code,
		}),
		entryPoint: props.entryPoint || "main",
	}
}

export const Shader = {
	Vertex: VertexShader,
	Fragment: FragmentShader,
	Compute: ComputeShader,
}
