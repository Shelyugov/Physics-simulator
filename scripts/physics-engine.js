const engine = {
	minDelta: 0.1,
	minSpeed: 0.1,
	maxStates: 1000,

	calculateSimulation: function(env, dt) {
		if (dt <= 0) {
			return;
		}
		while(canContinueCalculation(env)) {
			var state = $.extend({}, env.states[env.states.length - 1]);
			recalculateState(env, state, dt);
			env.states.push(state);
		}
	},

	createEnv: function(gCoef, initialState) {
		return {
			gCoefficient: gCoef,
			states: [initialState]
		};
	},

	createInitialState: function(x0, y0, vx0, vy0) {
		return {
			objects: [{
				x: x0,
				y: y0,
				v: {
					x: vx0,
					y: vy0
				}
			}]
		};
	}

	canContinueCalculation(env) {
		return env.states.length < maxStates;
	},

	recalculateState: function(env, state, dt) {
		applyForces(env, state, dt);
		moveAllObjects(env, state, dt);
	},

	moveAllObjects: function(env, state, dt) {
		state.objects.forEach(function(o) {
			if (Math.abs(o.v.x) > minSpeed) {
				o.x += o.v.x;
			} else {
				o.v.x = 0;
			}
			if (Math.abs(o.v.y) > minSpeed) {
				o.y = Math.abs(o.y + o.v.y);
			} else if (Math.abs(o.y) < minDelta) {
				o.y = 0;
				o.v.y = 0;
			}
		});
	},

	applyForces: function(env, state, dt) {
		state.objects.forEach(function(o) {
			$.each(forces, function(name, force) {
				force.applyTo(env, o, dt);
			});
		});
	},
};

const forces = {
	// Сила сопротивления воздуха
	airResistanceForce: {
		coef: 0.3, // Сила сопротивления воздуха
		applyTo: function(env, o, dt) {
			const v = o.v;
			v.x -= Math.sign(v.x) * Math.pow(v.x, 2) * coef;
			v.y -= Math.sign(v.y) * Math.pow(v.y, 2) * coef;
		}
	},

	// Сила гравитации
	gravityForce: {
		applyTo: function(env, o, dt) {
			o.v.y -= o.mass * env.gCoeffient * dt;
		}
	},

	// Сила реакции опоры
	supportReactionForce: {
		applyTo: function(env, o, dt) {
			if (o.y == 0) {
				o.v.y += o.mass * env.gCoefficient * dt;
			}
		}
	}
};
