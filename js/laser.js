game.Laser = me.Entity.extend({
    init : function (x, y, angle) {
        this._super(me.Entity, "init", [x, y, {width: 6, height: (me.game.viewport.width * 1.5)}]);
        this.z = 5;
        this.body.collisionType = game.collisionTypes.LASER;
        this.renderable = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, -6, -300]);
            },
            destroy : function () {},
            draw : function (renderer) {
                var color = renderer.getColor();
                renderer.setColor('#5E007E');
                renderer.fillRect(0, 0, -this.width, -300);
                renderer.setColor(color);
            }
        }));

        // TODO: Calculate the correct length of the laser to the edge of the viewport.
        this.body.addShape(new me.Rect(0, 0, 6, me.game.viewport.width * 1.5).rotate(angle - Math.PI / 2), false);
        this.body.shapes.shift();
        this.renderable.currentTransform.identity().translate(x, y);
        this.renderable.currentTransform.rotate(angle);

        this.alwaysUpdate = false;
        this.damage = 10;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        //this.pos.x += this.velx * time/1000;
        //this.pos.y += this.vely * time/1000;
        //this.body.vel.x += this.body.accel.x * time / 1000;
        //this.body.vel.y += this.body.accel.y * time / 1000;

        //this.pos.x = this.pos.x.clamp(0, this.maxX);
        //this.pos.y = this.pos.y.clamp(0, this.maxY);

        this.body.update();
        me.collision.check(this);
        return true;
    }
});
