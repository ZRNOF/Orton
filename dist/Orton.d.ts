declare const typeMap: {
    readonly i8: Int8ArrayConstructor;
    readonly i16: Int16ArrayConstructor;
    readonly i32: Int32ArrayConstructor;
    readonly u8: Uint8ArrayConstructor;
    readonly u16: Uint16ArrayConstructor;
    readonly u32: Uint32ArrayConstructor;
    readonly f32: Float32ArrayConstructor;
};
type TypeMapKeys = keyof typeof typeMap;
export const Data: (data: number | number[], type?: TypeMapKeys) => Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array;
interface VertexShaderProps {
    code: string;
    buffers: Iterable<GPUVertexBufferLayout>;
    entryPoint?: string;
    label?: string | undefined;
}
interface FragmentShaderProps {
    code: string;
    targets: Iterable<GPUColorTargetState>;
    entryPoint?: string;
    label?: string | undefined;
}
interface ComputeShaderProps {
    code: string;
    entryPoint?: string;
    label?: string | undefined;
}
export const Shader: {
    Vertex: (device: GPUDevice, props: VertexShaderProps) => GPUVertexState;
    Fragment: (device: GPUDevice, props: FragmentShaderProps) => GPUFragmentState;
    Compute: (device: GPUDevice, props: ComputeShaderProps | string) => GPUProgrammableStage;
};
type BufferUsage = "MAP_READ" | "MAP_WRITE" | "COPY_SRC" | "COPY_DST" | "INDEX" | "VERTEX" | "UNIFORM" | "STORAGE" | "INDIRECT" | "QUERY_RESOLVE";
interface BufferDescriptor {
    label?: string;
    usage: BufferUsage[];
    size: number;
    mappedAtCreation?: boolean;
}
export const Buffer: (device: GPUDevice, descriptor: BufferDescriptor) => GPUBuffer;
export const createVertexAttribute: ({ format, offset, shaderLocation, }: GPUVertexAttribute) => GPUVertexAttribute;
export const createVertexBufferLayout: ({ arrayStride, stepMode, attributes, }: GPUVertexBufferLayout) => GPUVertexBufferLayout;
type ShaderStage = "VERTEX" | "FRAGMENT" | "COMPUTE";
interface BindingProps {
    type?: GPUBufferBindingType | undefined;
    visibility: ShaderStage[];
    buffer: GPUBuffer;
    externalTexture?: GPUExternalTextureBindingLayout | undefined;
    sampler?: GPUSamplerBindingLayout | undefined;
    storageTexture?: GPUStorageTextureBindingLayout | undefined;
    texture?: GPUTextureBindingLayout | undefined;
}
export interface Binding extends BindingProps {
    bindGroupLayoutEntry: (binding: number) => GPUBindGroupLayoutEntry;
    bindGroupEntry: (binding: number) => GPUBindGroupEntry;
}
export const Binding: (props: BindingProps) => Binding;
export interface Group {
    getLayoutEntries: () => GPUBindGroupLayoutEntry[];
    getEntries: () => GPUBindGroupEntry[];
}
export const Group: (Bindings: Binding[]) => Group;
interface BindGroupDescriptor {
    label?: string;
    group: Group;
}
export const BindGroup: (device: GPUDevice, descriptor: BindGroupDescriptor | Group | Binding[]) => {
    bindGroup: GPUBindGroup;
    layout: GPUBindGroupLayout;
} | undefined;
export const PipelineLayout: (device: GPUDevice, descriptor: GPUPipelineLayoutDescriptor | GPUBindGroupLayout[]) => GPUPipelineLayout;
export const ComputePipeline: (device: GPUDevice, descriptor: GPUComputePipelineDescriptor) => GPUComputePipeline;
export const RenderPipeline: (device: GPUDevice, descriptor: GPURenderPipelineDescriptor) => GPURenderPipeline;
export const Pipeline: {
    Layout: (device: GPUDevice, descriptor: GPUPipelineLayoutDescriptor | GPUBindGroupLayout[]) => GPUPipelineLayout;
    Compute: (device: GPUDevice, descriptor: GPUComputePipelineDescriptor) => GPUComputePipeline;
    Render: (device: GPUDevice, descriptor: GPURenderPipelineDescriptor) => GPURenderPipeline;
};
interface ComputePassMethods {
    dispatchWorkgroups: (workgroupCountX: number, workgroupCountY?: number | undefined, workgroupCountZ?: number | undefined) => ComputePassMethods;
    dispatchWorkgroupsIndirect: (indirectBuffer: GPUBuffer, indirectOffset: number) => ComputePassMethods;
    end: () => void;
    insertDebugMarker: (markerLabel: string) => ComputePassMethods;
    popDebugGroup: () => ComputePassMethods;
    pushDebugGroup: (groupLabel: string) => ComputePassMethods;
    setBindGroup: (index: number, bindGroup: GPUBindGroup | null, dynamicOffsets?: Iterable<number> | undefined) => ComputePassMethods;
    setPipeline: (pipeline: GPUComputePipeline) => ComputePassMethods;
}
export const beginComputePass: (commandEncoder: GPUCommandEncoder, descriptor?: GPUComputePassDescriptor) => ComputePassMethods;
interface RenderPassMethods {
    beginOcclusionQuery: (queryIndex: number) => RenderPassMethods;
    draw: (vertexCount: number, instanceCount?: number | undefined, firstVertex?: number | undefined, firstInstance?: number | undefined) => RenderPassMethods;
    drawIndexed: (indexCount: number, instanceCount?: number | undefined, firstIndex?: number | undefined, baseVertex?: number | undefined, firstInstance?: number | undefined) => RenderPassMethods;
    drawIndexedIndirect: (indirectBuffer: GPUBuffer, indirectOffset: number) => RenderPassMethods;
    drawIndirect: (indirectBuffer: GPUBuffer, indirectOffset: number) => RenderPassMethods;
    end: () => void;
    endOcclusionQuery: () => RenderPassMethods;
    executeBundles: (bundles: Iterable<GPURenderBundle>) => RenderPassMethods;
    insertDebugMarker: (markerLabel: string) => RenderPassMethods;
    popDebugGroup: () => RenderPassMethods;
    pushDebugGroup: (groupLabel: string) => RenderPassMethods;
    setBindGroup: (index: number, bindGroup: GPUBindGroup | null, dynamicOffsets?: Iterable<number> | undefined) => RenderPassMethods;
    setBlendConstant: (color: GPUColor) => RenderPassMethods;
    setIndexBuffer: (buffer: GPUBuffer, indexFormat: GPUIndexFormat, offset?: number | undefined, size?: number | undefined) => RenderPassMethods;
    setPipeline: (pipeline: GPURenderPipeline) => RenderPassMethods;
    setScissorRect: (x: number, y: number, width: number, height: number) => RenderPassMethods;
    setStencilReference: (reference: number) => RenderPassMethods;
    setVertexBuffer: (slot: number, buffer: GPUBuffer | null, offset?: number | undefined, size?: number | undefined) => RenderPassMethods;
    setViewport: (x: number, y: number, width: number, height: number, minDepth: number, maxDepth: number) => RenderPassMethods;
}
export const beginRenderPass: (commandEncoder: GPUCommandEncoder, descriptor: GPURenderPassDescriptor) => RenderPassMethods;
export const createRenderPassDescriptor: (descriptor: GPURenderPassDescriptor) => GPURenderPassDescriptor;
export const Pass: {
    Compute: (commandEncoder: GPUCommandEncoder, descriptor?: GPUComputePassDescriptor) => ComputePassMethods;
    Render: (commandEncoder: GPUCommandEncoder, descriptor: GPURenderPassDescriptor) => RenderPassMethods;
    RenderPassDescriptor: (descriptor: GPURenderPassDescriptor) => GPURenderPassDescriptor;
};
export const init: (canvas: HTMLCanvasElement, options?: GPUDeviceDescriptor | undefined) => Promise<{
    gpu: GPU;
    adapter: GPUAdapter;
    device: GPUDevice;
    context: GPUCanvasContext | null;
    preferredFormat: GPUTextureFormat;
    queue: GPUQueue;
    getCurrentTexture: () => GPUTexture | undefined;
    createView: () => GPUTextureView | undefined;
    CommandEncoder: (device: GPUDevice) => GPUCommandEncoder;
    Shader: {
        Vertex: (device: GPUDevice, props: import("Shader").VertexShaderProps) => GPUVertexState;
        Fragment: (device: GPUDevice, props: import("Shader").FragmentShaderProps) => GPUFragmentState;
        Compute: (device: GPUDevice, props: string | import("Shader").ComputeShaderProps) => GPUProgrammableStage;
    };
    Buffer: (device: GPUDevice, descriptor: import("Buffer").BufferDescriptor) => GPUBuffer;
    createVertexAttribute: ({ format, offset, shaderLocation, }: GPUVertexAttribute) => GPUVertexAttribute;
    createVertexBufferLayout: ({ arrayStride, stepMode, attributes, }: GPUVertexBufferLayout) => GPUVertexBufferLayout;
    Binding: (props: import("BindGroup").BindingProps) => Binding;
    Group: (Bindings: Binding[]) => Group;
    BindGroup: (device: GPUDevice, descriptor: Group | Binding[] | import("BindGroup").BindGroupDescriptor) => {
        bindGroup: GPUBindGroup;
        layout: GPUBindGroupLayout;
    } | undefined;
    PipelineLayout: (device: GPUDevice, descriptor: GPUPipelineLayoutDescriptor | GPUBindGroupLayout[]) => GPUPipelineLayout;
    ComputePipeline: (device: GPUDevice, descriptor: GPUComputePipelineDescriptor) => GPUComputePipeline;
    RenderPipeline: (device: GPUDevice, descriptor: GPURenderPipelineDescriptor) => GPURenderPipeline;
    Pipeline: {
        Layout: (device: GPUDevice, descriptor: GPUPipelineLayoutDescriptor | GPUBindGroupLayout[]) => GPUPipelineLayout;
        Compute: (device: GPUDevice, descriptor: GPUComputePipelineDescriptor) => GPUComputePipeline;
        Render: (device: GPUDevice, descriptor: GPURenderPipelineDescriptor) => GPURenderPipeline;
    };
    beginComputePass: (commandEncoder: GPUCommandEncoder, descriptor?: GPUComputePassDescriptor | undefined) => import("Pass").ComputePassMethods;
    beginRenderPass: (commandEncoder: GPUCommandEncoder, descriptor: GPURenderPassDescriptor) => import("Pass").RenderPassMethods;
    createRenderPassDescriptor: (descriptor: GPURenderPassDescriptor) => GPURenderPassDescriptor;
    Pass: {
        Compute: (commandEncoder: GPUCommandEncoder, descriptor?: GPUComputePassDescriptor | undefined) => import("Pass").ComputePassMethods;
        Render: (commandEncoder: GPUCommandEncoder, descriptor: GPURenderPassDescriptor) => import("Pass").RenderPassMethods;
        RenderPassDescriptor: (descriptor: GPURenderPassDescriptor) => GPURenderPassDescriptor;
    };
} | undefined>;
export const Orton: {
    init: (canvas: HTMLCanvasElement, options?: GPUDeviceDescriptor | undefined) => Promise<{
        gpu: GPU;
        adapter: GPUAdapter;
        device: GPUDevice;
        context: GPUCanvasContext | null;
        preferredFormat: GPUTextureFormat;
        queue: GPUQueue;
        getCurrentTexture: () => GPUTexture | undefined;
        createView: () => GPUTextureView | undefined;
        CommandEncoder: (device: GPUDevice) => GPUCommandEncoder;
        Shader: {
            Vertex: (device: GPUDevice, props: import("Shader").VertexShaderProps) => GPUVertexState;
            Fragment: (device: GPUDevice, props: import("Shader").FragmentShaderProps) => GPUFragmentState;
            Compute: (device: GPUDevice, props: string | import("Shader").ComputeShaderProps) => GPUProgrammableStage;
        };
        Buffer: (device: GPUDevice, descriptor: import("Buffer").BufferDescriptor) => GPUBuffer;
        createVertexAttribute: ({ format, offset, shaderLocation, }: GPUVertexAttribute) => GPUVertexAttribute;
        createVertexBufferLayout: ({ arrayStride, stepMode, attributes, }: GPUVertexBufferLayout) => GPUVertexBufferLayout;
        Binding: (props: import("BindGroup").BindingProps) => Binding;
        Group: (Bindings: Binding[]) => Group;
        BindGroup: (device: GPUDevice, descriptor: Group | Binding[] | import("BindGroup").BindGroupDescriptor) => {
            bindGroup: GPUBindGroup;
            layout: GPUBindGroupLayout;
        } | undefined;
        PipelineLayout: (device: GPUDevice, descriptor: GPUPipelineLayoutDescriptor | GPUBindGroupLayout[]) => GPUPipelineLayout;
        ComputePipeline: (device: GPUDevice, descriptor: GPUComputePipelineDescriptor) => GPUComputePipeline;
        RenderPipeline: (device: GPUDevice, descriptor: GPURenderPipelineDescriptor) => GPURenderPipeline;
        Pipeline: {
            Layout: (device: GPUDevice, descriptor: GPUPipelineLayoutDescriptor | GPUBindGroupLayout[]) => GPUPipelineLayout;
            Compute: (device: GPUDevice, descriptor: GPUComputePipelineDescriptor) => GPUComputePipeline;
            Render: (device: GPUDevice, descriptor: GPURenderPipelineDescriptor) => GPURenderPipeline;
        };
        beginComputePass: (commandEncoder: GPUCommandEncoder, descriptor?: GPUComputePassDescriptor | undefined) => import("Pass").ComputePassMethods;
        beginRenderPass: (commandEncoder: GPUCommandEncoder, descriptor: GPURenderPassDescriptor) => import("Pass").RenderPassMethods;
        createRenderPassDescriptor: (descriptor: GPURenderPassDescriptor) => GPURenderPassDescriptor;
        Pass: {
            Compute: (commandEncoder: GPUCommandEncoder, descriptor?: GPUComputePassDescriptor | undefined) => import("Pass").ComputePassMethods;
            Render: (commandEncoder: GPUCommandEncoder, descriptor: GPURenderPassDescriptor) => import("Pass").RenderPassMethods;
            RenderPassDescriptor: (descriptor: GPURenderPassDescriptor) => GPURenderPassDescriptor;
        };
    } | undefined>;
};

//# sourceMappingURL=Orton.d.ts.map
