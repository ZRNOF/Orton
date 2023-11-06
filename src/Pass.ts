export interface ComputePassMethods {
	dispatchWorkgroups: (
		workgroupCountX: number,
		workgroupCountY?: number | undefined,
		workgroupCountZ?: number | undefined
	) => ComputePassMethods

	dispatchWorkgroupsIndirect: (
		indirectBuffer: GPUBuffer,
		indirectOffset: number
	) => ComputePassMethods

	end: () => void

	insertDebugMarker: (markerLabel: string) => ComputePassMethods

	popDebugGroup: () => ComputePassMethods

	pushDebugGroup: (groupLabel: string) => ComputePassMethods

	setBindGroup: (
		index: number,
		bindGroup: GPUBindGroup | null,
		dynamicOffsets?: Iterable<number> | undefined
	) => ComputePassMethods

	setPipeline: (pipeline: GPUComputePipeline) => ComputePassMethods
}

export const beginComputePass = (
	commandEncoder: GPUCommandEncoder,
	descriptor?: GPUComputePassDescriptor
): ComputePassMethods => {
	const computePass = commandEncoder.beginComputePass(descriptor)

	const dispatchWorkgroups = (
		workgroupCountX: number,
		workgroupCountY?: number | undefined,
		workgroupCountZ?: number | undefined
	) => {
		computePass.dispatchWorkgroups(
			workgroupCountX,
			workgroupCountY,
			workgroupCountZ
		)
		return methods
	}

	const dispatchWorkgroupsIndirect = (
		indirectBuffer: GPUBuffer,
		indirectOffset: number
	) => {
		computePass.dispatchWorkgroupsIndirect(indirectBuffer, indirectOffset)
		return methods
	}

	const end = () => {
		computePass.end()
	}

	const insertDebugMarker = (markerLabel: string) => {
		computePass.insertDebugMarker(markerLabel)
		return methods
	}

	const popDebugGroup = () => {
		computePass.popDebugGroup()
		return methods
	}

	const pushDebugGroup = (groupLabel: string) => {
		computePass.pushDebugGroup(groupLabel)
		return methods
	}

	const setBindGroup = (
		index: number,
		bindGroup: GPUBindGroup | null,
		dynamicOffsets?: Iterable<number> | undefined
	) => {
		computePass.setBindGroup(index, bindGroup, dynamicOffsets)
		return methods
	}

	const setPipeline = (pipeline: GPUComputePipeline) => {
		computePass.setPipeline(pipeline)
		return methods
	}

	const methods: ComputePassMethods = {
		dispatchWorkgroups,
		dispatchWorkgroupsIndirect,
		end,
		insertDebugMarker,
		popDebugGroup,
		pushDebugGroup,
		setBindGroup,
		setPipeline,
	}

	return methods
}

export interface RenderPassMethods {
	beginOcclusionQuery: (queryIndex: number) => RenderPassMethods

	draw: (
		vertexCount: number,
		instanceCount?: number | undefined,
		firstVertex?: number | undefined,
		firstInstance?: number | undefined
	) => RenderPassMethods

	drawIndexed: (
		indexCount: number,
		instanceCount?: number | undefined,
		firstIndex?: number | undefined,
		baseVertex?: number | undefined,
		firstInstance?: number | undefined
	) => RenderPassMethods

	drawIndexedIndirect: (
		indirectBuffer: GPUBuffer,
		indirectOffset: number
	) => RenderPassMethods

	drawIndirect: (
		indirectBuffer: GPUBuffer,
		indirectOffset: number
	) => RenderPassMethods

	end: () => void

	endOcclusionQuery: () => RenderPassMethods

	executeBundles: (bundles: Iterable<GPURenderBundle>) => RenderPassMethods

	insertDebugMarker: (markerLabel: string) => RenderPassMethods

	popDebugGroup: () => RenderPassMethods

	pushDebugGroup: (groupLabel: string) => RenderPassMethods

	setBindGroup: (
		index: number,
		bindGroup: GPUBindGroup | null,
		dynamicOffsets?: Iterable<number> | undefined
	) => RenderPassMethods

	setBlendConstant: (color: GPUColor) => RenderPassMethods

	setIndexBuffer: (
		buffer: GPUBuffer,
		indexFormat: GPUIndexFormat,
		offset?: number | undefined,
		size?: number | undefined
	) => RenderPassMethods

	setPipeline: (pipeline: GPURenderPipeline) => RenderPassMethods

	setScissorRect: (
		x: number,
		y: number,
		width: number,
		height: number
	) => RenderPassMethods

	setStencilReference: (reference: number) => RenderPassMethods

	setVertexBuffer: (
		slot: number,
		buffer: GPUBuffer | null,
		offset?: number | undefined,
		size?: number | undefined
	) => RenderPassMethods

	setViewport: (
		x: number,
		y: number,
		width: number,
		height: number,
		minDepth: number,
		maxDepth: number
	) => RenderPassMethods
}

export const beginRenderPass = (
	commandEncoder: GPUCommandEncoder,
	descriptor: GPURenderPassDescriptor
): RenderPassMethods => {
	const renderPass = commandEncoder.beginRenderPass(descriptor)

	const beginOcclusionQuery = (queryIndex: number) => {
		renderPass.beginOcclusionQuery(queryIndex)
		return methods
	}

	const draw = (
		vertexCount: number,
		instanceCount?: number | undefined,
		firstVertex?: number | undefined,
		firstInstance?: number | undefined
	) => {
		renderPass.draw(vertexCount, instanceCount, firstVertex, firstInstance)
		return methods
	}

	const drawIndexed = (
		indexCount: number,
		instanceCount?: number | undefined,
		firstIndex?: number | undefined,
		baseVertex?: number | undefined,
		firstInstance?: number | undefined
	) => {
		renderPass.drawIndexed(
			indexCount,
			instanceCount,
			firstIndex,
			baseVertex,
			firstInstance
		)
		return methods
	}

	const drawIndexedIndirect = (
		indirectBuffer: GPUBuffer,
		indirectOffset: number
	) => {
		renderPass.drawIndexedIndirect(indirectBuffer, indirectOffset)
		return methods
	}

	const drawIndirect = (indirectBuffer: GPUBuffer, indirectOffset: number) => {
		renderPass.drawIndirect(indirectBuffer, indirectOffset)
		return methods
	}

	const end = () => {
		renderPass.end()
	}

	const endOcclusionQuery = () => {
		renderPass.endOcclusionQuery()
		return methods
	}

	const executeBundles = (bundles: Iterable<GPURenderBundle>) => {
		renderPass.executeBundles(bundles)
		return methods
	}

	const insertDebugMarker = (markerLabel: string) => {
		renderPass.insertDebugMarker(markerLabel)
		return methods
	}

	const popDebugGroup = () => {
		renderPass.popDebugGroup()
		return methods
	}

	const pushDebugGroup = (groupLabel: string) => {
		renderPass.pushDebugGroup(groupLabel)
		return methods
	}

	const setBindGroup = (
		index: number,
		bindGroup: GPUBindGroup | null,
		dynamicOffsets?: Iterable<number> | undefined
	) => {
		renderPass.setBindGroup(index, bindGroup, dynamicOffsets)
		return methods
	}

	const setBlendConstant = (color: GPUColor) => {
		renderPass.setBlendConstant(color)
		return methods
	}

	const setIndexBuffer = (
		buffer: GPUBuffer,
		indexFormat: GPUIndexFormat,
		offset?: number | undefined,
		size?: number | undefined
	) => {
		renderPass.setIndexBuffer(buffer, indexFormat, offset, size)
		return methods
	}

	const setPipeline = (pipeline: GPURenderPipeline) => {
		renderPass.setPipeline(pipeline)
		return methods
	}

	const setScissorRect = (
		x: number,
		y: number,
		width: number,
		height: number
	) => {
		renderPass.setScissorRect(x, y, width, height)
		return methods
	}

	const setStencilReference = (reference: number) => {
		renderPass.setStencilReference(reference)
		return methods
	}

	const setVertexBuffer = (
		slot: number,
		buffer: GPUBuffer | null,
		offset?: number | undefined,
		size?: number | undefined
	) => {
		renderPass.setVertexBuffer(slot, buffer, offset, size)
		return methods
	}

	const setViewport = (
		x: number,
		y: number,
		width: number,
		height: number,
		minDepth: number,
		maxDepth: number
	) => {
		renderPass.setViewport(x, y, width, height, minDepth, maxDepth)
		return methods
	}

	const methods: RenderPassMethods = {
		beginOcclusionQuery,
		draw,
		drawIndexed,
		drawIndexedIndirect,
		drawIndirect,
		end,
		endOcclusionQuery,
		executeBundles,
		insertDebugMarker,
		popDebugGroup,
		pushDebugGroup,
		setBindGroup,
		setBlendConstant,
		setIndexBuffer,
		setPipeline,
		setScissorRect,
		setStencilReference,
		setVertexBuffer,
		setViewport,
	}

	return methods
}

export const createRenderPassDescriptor = (
	descriptor: GPURenderPassDescriptor
): GPURenderPassDescriptor => {
	return descriptor
}

export const Pass = {
	Compute: beginComputePass,
	Render: beginRenderPass,
	RenderPassDescriptor: createRenderPassDescriptor,
}
