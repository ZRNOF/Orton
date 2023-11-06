export const PipelineLayout = (
	device: GPUDevice,
	descriptor: GPUPipelineLayoutDescriptor | GPUBindGroupLayout[]
): GPUPipelineLayout => {
	if (Array.isArray(descriptor)) {
		return device.createPipelineLayout({
			bindGroupLayouts: descriptor,
		})
	} else return device.createPipelineLayout(descriptor)
}

export const ComputePipeline = (
	device: GPUDevice,
	descriptor: GPUComputePipelineDescriptor
) => {
	return device.createComputePipeline(descriptor)
}

export const RenderPipeline = (
	device: GPUDevice,
	descriptor: GPURenderPipelineDescriptor
) => {
	return device.createRenderPipeline(descriptor)
}

export const Pipeline = {
	Layout: PipelineLayout,
	Compute: ComputePipeline,
	Render: RenderPipeline,
}
