<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
  <el-row>
    <el-col>
      <el-button type="primary">添加用户</el-button>
    </el-col>
  </el-row>
  <el-table :data="rolelist" border stripe>
    <!-- 展开列 -->
    <el-table-column type="expand">
      <template slot-scope="scope">
      <el-row :class="['bdbuttom',i1 === 0?'bdtop':'',vcenter]" v-for="(item1,i1) in scope.row.children" :key="item1.id">
        <!-- yiji -->
        <el-col :span="5">
          <el-tag>{{item1.authname}}</el-tag>
          <i class="el-icon-caret-right"></i>
        </el-col>
        <!-- erji -->
        <el-col :span="19">
          <el-row :class="[i2 === 0?'':'bdtop',vcenter]" v-for="(item2,i2) in item1.children" :key="item2.id">
            <el-col :span="6">
              <el-tag type="success">{{item2.authname}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="18">
              <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightByid(scope.row,item3.id)">{{item3.authname}}</el-tag>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      </template>
    </el-table-column>
    <!-- 索引列 -->
   <el-table-column type="index"></el-table-column>
  <el-table-column label="角色名称" prop="rolename"></el-table-column>
  <el-table-column label="角色描述" prop="roledesc"></el-table-column>
  <el-table-column label="操作" width='300'>
     <template slot-scope="scope">
    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
    <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
    </template>
  </el-table-column>
  </el-table>
</el-card>
<el-dialog
  title="分配权限"
  :visible.sync="setRightDialogVisible"
  width="50%"
  @close='setRightDialogClosed'
  >
  <el-tree :data="rightlist"
  :props="treeProps"
  show-checkbox
  node-key="id"
  default-expand-all
  :default-checked-keys="defkey"
  ref="treeRef"
  >
  </el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roleId: '',
      defkey: [],
      treeProps: {
        label: 'authname',
        children: 'children'
      },
      rightlist: [
        {
          id: 101,
          authname: '商品列表',
          path: 'goods',
          children: [
            {
              id: 1001,
              authname: '商品修改',
              path: 'goods',
              children: [
                {
                  id: 1003,
                  authname: '商品修改',
                  path: 'goods'
                },
                {
                  id: 1004,
                  authname: '分类修改',
                  path: 'goods'
                }
              ]
            },
            {
              id: 1002,
              authname: '分类修改',
              path: 'goods',
              children: [
                {
                  id: 1005,
                  authname: '商品修',
                  path: 'goods'
                },
                {
                  id: 1006,
                  authname: '分修改',
                  path: 'goods'
                }
              ]
            }
          ]
        },
        {
          id: 102,
          authname: '商列表',
          path: 'goods'
        }
      ],
      setRightDialogVisible: false,
      rolelist: [
        {
          rolename: 'zhangyue',
          roledesc: 'asda'
        },
        {
          rolename: 'zhangyue',
          roledesc: 'asda',
          children: [
            {
              id: 101,
              authname: '商品列表',
              path: 'goods',
              children: [
                {
                  id: 1001,
                  authname: '商品修改',
                  path: 'goods',
                  children: [
                    {
                      id: 1003,
                      authname: '商品修改',
                      path: 'goods'
                    },
                    {
                      id: 1004,
                      authname: '分类修改',
                      path: 'goods'
                    }
                  ]
                },
                {
                  id: 1002,
                  authname: '分类修改',
                  path: 'goods',
                  children: [
                    {
                      id: 1005,
                      authname: '商品修',
                      path: 'goods'
                    },
                    {
                      id: 1006,
                      authname: '分修改',
                      path: 'goods'
                    }
                  ]
                }
              ]
            },
            {
              id: 102,
              authname: '商列表',
              path: 'goods'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getrolelist()
  },
  components: {},

  methods: {
    async getrolelist() {
      // eslint-disable-next-line standard/object-curly-even-spacing
      const { data: res} = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      }
      this.rolelist = res.data
    },
    async removeRightByid(role, rightID) {
    //  tankuangtishi
      const confirmresult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmresult !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      console.log('确认了删除')
      // eslint-disable-next-line no-template-curly-in-string
      // const {data: res} = await this.$http.delete('roles/${role.id}/right/${rightID}')
      // if (res.meta.status !== 200) {
      //   return this.$message.error('shanchushibai')
      // }
      // role.children = res.data
    },
    async showSetRightDialog(role) {
      this.roleId = role.id
      // 获取权限
      // const {data: res} = await this.$http.get('right/tree')
      // if (res.data.status !== 200) {
      //   return this.$message.error('获取失败')
      // }
      // this.rightlist = res.data
      this.getLeafKey(role, this.defkey)
      this.setRightDialogVisible = true
    },
    // 递归展示权限
    getLeafKey(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item =>
        this.getLeafKey(item, arr)
      )
    },
    // 重新赋值
    setRightDialogClosed() {
      this.defkey = []
    },
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idSr = keys.join(',')
      console.log(keys)
      // eslint-disable-next-line no-template-curly-in-string
      const {data: res} = await this.$http.post('roles/${this.rloeId}/rights', {rids: idSr})
      if (res.meta.status !== 200) {
        return this.$message.error('failture')
      }
      this.$message.success('success')
      this.getrolelist()
      this.setRightDialogVisible = false
    }
  }
}

</script>
<style  scoped>
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbuttom{
  border-top: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>
