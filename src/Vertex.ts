export const createVertexAttribute = ({
	format,
	offset,
	shaderLocation,
}: GPUVertexAttribute): GPUVertexAttribute => {
	return {
		format,
		offset,
		shaderLocation,
	}
}

export const createVertexBufferLayout = ({
	arrayStride,
	stepMode = "vertex",
	attributes,
}: GPUVertexBufferLayout): GPUVertexBufferLayout => {
	return {
		arrayStride,
		stepMode,
		attributes,
	}
}
