/**
 * 
 * Copyright 2022-2023 wiletki
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface SuperflakeOptions {
	nodeId?: number
	timeOffset?: number
}

export default class Superflake {
	private sequence: number = 0
	private lastTime: number = 0

	private nodeId: number = 1
	private timeOffset: number = 1616275800

	constructor(options: SuperflakeOptions) {
		this.nodeId = (options.nodeId || this.nodeId) % 1023
		this.timeOffset = options.timeOffset || this.timeOffset
	}

	gen(raw: boolean = false): string | BigInt {
		const nowTime = Date.now()
		const genTime = (nowTime - this.timeOffset).toString(2)

		this.sequence = 0
	
		if (this.lastTime === nowTime) {
			this.sequence += 1

			if (this.sequence > 4095) {
				this.sequence = 0

				while (Date.now() <= nowTime) { }
			}
		}

		this.lastTime = nowTime

        const genSequence = this.sequence.toString(2).padStart(12, '0')
		const genNode = this.nodeId.toString(2).padStart(10, '0')
		const rawId = genTime + genNode + genSequence

		let id = ''

		for (let i = rawId.length; i > 0; i -= 4) {
			id = parseInt(rawId.substring(i - 4, i), 2).toString(16) + id
		}

        let superflake = BigInt(`0x${id}`)

		return raw ? superflake : `${superflake}`
	}
}