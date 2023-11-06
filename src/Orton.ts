import { Data } from "./DataType.js"
import { errorMask } from "./errorMask.js"
import { Shader } from "./Shader.js"
import { Buffer } from "./Buffer.js"
import { createVertexAttribute, createVertexBufferLayout } from "./Vertex.js"
import { Binding, Group, BindGroup } from "./BindGroup.js"
import {
	Pipeline,
	PipelineLayout,
	ComputePipeline,
	RenderPipeline,
} from "./Pipeline.js"
import {
	Pass,
	beginComputePass,
	beginRenderPass,
	createRenderPassDescriptor,
} from "./Pass.js"

const init = async (
	canvas: HTMLCanvasElement,
	options?: GPUDeviceDescriptor | undefined
) => {
	const gpu: GPU = (navigator as any).gpu

	if (!gpu) {
		const msg = `WebGPU is not supported in this browser`
		console.error(msg)
		errorMask("Error", msg)
		return
	}

	const adapter = await gpu.requestAdapter()
	if (!adapter) {
		const msg = `couldn't request WebGPU adapter`
		console.error(msg)
		errorMask("Error", msg)
		return
	}

	const device = await adapter?.requestDevice(options)
	device.lost.then(() => {
		const msg = `WebGPU device was lost...`
		console.error(msg)
		return
	})

	const context = canvas.getContext("webgpu")
	const preferredFormat = gpu.getPreferredCanvasFormat()
	const queue = device.queue
	const getCurrentTexture = () => context?.getCurrentTexture()
	const createView = () => context?.getCurrentTexture().createView()
	const CommandEncoder = (device: GPUDevice) => device.createCommandEncoder()

	return {
		gpu,
		adapter,
		device,
		context,
		preferredFormat,
		queue,
		getCurrentTexture,
		createView,
		CommandEncoder,
		// Shader
		Shader,
		// Buffer
		Buffer,
		// Vertex
		createVertexAttribute,
		createVertexBufferLayout,
		// BindGroup
		Binding,
		Group,
		BindGroup,
		// Pipeline
		PipelineLayout,
		ComputePipeline,
		RenderPipeline,
		Pipeline,
		// Pass
		beginComputePass,
		beginRenderPass,
		createRenderPassDescriptor,
		Pass,
	}
}

const Orton = { init }

export {
	Data,
	Orton,
	init,
	// Shader
	Shader,
	// Buffer
	Buffer,
	// Vertex
	createVertexAttribute,
	createVertexBufferLayout,
	// BindGroup
	Binding,
	Group,
	BindGroup,
	// Pipeline
	PipelineLayout,
	ComputePipeline,
	RenderPipeline,
	Pipeline,
	// Pass
	beginComputePass,
	beginRenderPass,
	createRenderPassDescriptor,
	Pass,
}
