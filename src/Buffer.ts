export type BufferUsage =
	| "MAP_READ"
	| "MAP_WRITE"
	| "COPY_SRC"
	| "COPY_DST"
	| "INDEX"
	| "VERTEX"
	| "UNIFORM"
	| "STORAGE"
	| "INDIRECT"
	| "QUERY_RESOLVE"

export interface BufferDescriptor {
	label?: string
	usage: BufferUsage[]
	size: number
	mappedAtCreation?: boolean
}

export const Buffer = (device: GPUDevice, descriptor: BufferDescriptor) => {
	return device.createBuffer({
		label: descriptor.label,
		size: descriptor.size,
		usage: descriptor.usage.reduce((acc, usage) => {
			return acc | GPUBufferUsage[usage]
		}, 0),
	})
}
